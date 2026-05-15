import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BookingDetails {
  id: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  hotelName: string;
  bookingDate: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  price: string;
}

interface BookingContextType {
  bookings: BookingDetails[];
  addBooking: (booking: Omit<BookingDetails, 'id' | 'bookingDate' | 'status'>) => void;
  clearAllBookings: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = '@exploreasy_bookings';

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isFirstRender = useRef(true);

  // Load bookings from AsyncStorage on mount
  useEffect(() => {
    const initLoad = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedBookings) {
          const parsed = JSON.parse(storedBookings);
          if (Array.isArray(parsed)) {
            setBookings(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to load bookings from storage', error);
      } finally {
        setIsLoaded(true);
      }
    };
    initLoad();
  }, []);

  // Persist bookings whenever they change (after initial load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (isLoaded) {
      const saveToStorage = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        } catch (error) {
          console.error('Failed to save bookings to storage', error);
        }
      };
      saveToStorage();
    }
  }, [bookings, isLoaded]);

  const addBooking = (details: Omit<BookingDetails, 'id' | 'bookingDate' | 'status'>) => {
    const newBooking: BookingDetails = {
      ...details,
      id: Math.random().toString(36).substr(2, 9),
      bookingDate: new Date().toLocaleDateString(),
      status: 'Confirmed',
    };
    
    setBookings((prev) => [newBooking, ...prev]);
  };

  const clearAllBookings = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setBookings([]);
    } catch (error) {
      console.error('Failed to clear bookings', error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, clearAllBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
