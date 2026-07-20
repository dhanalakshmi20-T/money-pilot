export type Theme = 'light' | 'dark' | 'system';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

import { Notifications } from "./notifications";

export interface Preferences {
    theme: Theme;
    currency: Currency;
    notifications: Notifications;
}
