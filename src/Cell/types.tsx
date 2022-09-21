export interface CellIntrospectionData {
  userId?: string;
  logUserId?: string;
  requestId?: string;
  insertionId?: string;
  promotedRank?: number;
  retrievalRank?: number;
  pClick?: number;
  pPurchase?: number;
  queryRelevance?: number;
  personalization?: number;
  handleClose?: string;
}
