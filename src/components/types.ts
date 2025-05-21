export interface Item {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
}
