enum ResponseStatus {
    won = 'WON',
    lost = 'LOST',
    aborted = 'ABORTED',
    pending = 'PENDING',
}

export interface ResponseQuote {
    id: string;
    comment: string;
    price?: number;
    attachments?: number;
    product?: string;
    expiration: string;
    terms?: string;
    requests: number;
    author: string;
    locationId: string;
    status: ResponseStatus;
    active: boolean;
    createdAt: string;

  }
