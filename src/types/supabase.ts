
export type CropPredictionRecord = {
  id: string;
  created_at: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  predicted_crop: string;
};

export type Database = {
  public: {
    Tables: {
      crop_predictions: {
        Row: CropPredictionRecord;
        Insert: Omit<CropPredictionRecord, 'id' | 'created_at'>;
      };
    };
  };
};
