//  lib/socket.ts
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  autoConnect: false,
}); // Use full backend URL in production
