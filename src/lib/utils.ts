import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {format} from 'date-fns'
import type { ClassValue } from 'clsx';
import type { UserRole } from '@/types/user';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function userpath(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "admin"
    case "PROJECT_MANAGER":
      return "pm"
    case "USER":
      return "user"
  }
}

export function formatDate(date:Date) {
  return format(date,"dd/MM/yyyy")
}