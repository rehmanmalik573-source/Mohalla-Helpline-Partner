export type Language = 'hi' | 'en';
export type UserRole = 'customer' | 'provider' | 'admin';

export interface ServiceItem {
  id: string;
  name: string;
  nameHi: string;
  subcategoryId: string;
  mainCategoryId: number;
  genderOrType?: 'men' | 'women' | 'all';
  avgRate?: string;
  tagline?: string;
  taglineHi?: string;
  icon?: string;
  image?: string;
  specialties?: string[];
  specialtiesHi?: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  emoji?: string;
  image?: string;
  description?: string;
  descriptionHi?: string;
  mainCategoryId: number;
  hasGenderFilter?: boolean;
  services: ServiceItem[];
}

export interface Category {
  id: number;
  name: string;
  nameHi: string;
  icon: string;
  color: string;
  image: string;
  tagline?: string;
  taglineHi?: string;
  avgRate?: string;
  commonServices?: string[];
  commonServicesHi?: string[];
  mainCategoryId?: number;
  mainCategoryName?: string;
  mainCategoryNameHi?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  subcategoryNameHi?: string;
}

export interface MainCategory {
  id: number;
  name: string;
  nameHi: string;
  icon: string;
  emoji: string;
  image: string;
  description: string;
  descriptionHi: string;
  color: string;
  subcategories: Subcategory[];
  services: Category[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  commentHi?: string;
  serviceUsed: string;
  verified: boolean;
  providerId?: string;
}

export interface Provider {
  id: string;
  name: string;
  nameHi: string;
  categoryId: number;
  categoryName: string;
  categoryNameHi: string;
  title: string;
  titleHi: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  experienceYears: number;
  jobsCompleted: number;
  distance: string;
  distanceHi: string;
  location: string;
  locationHi: string;
  isAvailableNow: boolean;
  isVerified: boolean;
  verificationStatus?: 'pending' | 'verified' | 'correction_required' | 'rejected';
  verificationNotes?: string;
  badge?: string;
  badgeHi?: string;
  bio: string;
  bioHi: string;
  specialties: string[];
  specialtiesHi: string[];
  gallery: string[];
  reviews: Review[];
  phone: string;
  responseMinutes: number;
  upiId?: string;
  idProofType?: string;
  idProofNumber?: string;
  idProofDocUrl?: string;
  workingHours?: string;
  serviceAreas?: string[];
  totalEarnings?: number;
}

export type RequestStatus = 
  | 'requested'
  | 'provider_found'
  | 'accepted'
  | 'on_the_way'
  | 'service_started'
  | 'completed'
  | 'cancelled';

export interface AssignedProvider {
  id: string;
  name: string;
  nameHi: string;
  avatar: string;
  categoryName: string;
  categoryNameHi: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  phone: string;
  etaMinutes: number;
  badge?: string;
}

export interface PaymentRecord {
  id: string;
  requestId: string;
  amount: number;
  method: 'upi' | 'qr' | 'gateway' | 'cash';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  date: string;
  senderName: string;
  receiverName: string;
  txnRef?: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  categoryId: number;
  categoryName: string;
  categoryNameHi: string;
  serviceType: string;
  problemDescription: string;
  photoUrl?: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  estimatedPrice: number;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  assignedProvider?: AssignedProvider;
  ratingGiven?: number;
  reviewGiven?: string;
  payment?: PaymentRecord;
  notes?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  locality: string;
  avatar?: string;
  isLoggedIn: boolean;
  registeredAt: string;
  savedProviderIds?: string[];
}

export interface CustomerNotification {
  id: string;
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  timestamp: string;
  requestId?: string;
  read: boolean;
  type: 'status_change' | 'promo' | 'system' | 'payment' | 'verification';
  targetRole?: UserRole;
}

export interface BookingStatus {
  confirmed: string;
  on_the_way: string;
  in_progress: string;
  completed: string;
  cancelled: string;
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerPhone: string;
  categoryId: number;
  categoryName: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  address: string;
  notes: string;
  isEmergency: boolean;
  totalEstimatedCost: number;
  status: 'confirmed' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  ratingGiven?: number;
  reviewGiven?: string;
}

export interface FilterOptions {
  categoryId: number | null;
  searchQuery: string;
  location: string;
  sortBy: 'rating' | 'price_asc' | 'price_desc' | 'jobs' | 'fastest';
  onlyAvailableNow: boolean;
  onlyVerified: boolean;
  maxPrice: number;
}
