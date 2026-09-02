export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;

  categoryId: number;
  categoryName: string;
  categoryNameHi: string;

  serviceType: string;
  serviceTypeHi: string;

  problemDescription: string;
  problemDescriptionHi: string;

  photoUrl?: string;

  location: string;
  locationHi: string;

  preferredDate: string;
  preferredDateHi: string;

  preferredTime: string;
  preferredTimeHi: string;

  estimatedPrice: number;
  status: RequestStatus;

  createdAt: string;
  createdAtHi: string;

  updatedAt: string;
  updatedAtHi: string;

  assignedProvider?: AssignedProvider;

  ratingGiven?: number;
  reviewGiven?: string;

  payment?: PaymentRecord;
  notes?: string;
}
