export interface FormData {
    title: string;
    address: string;
    content: string;
    category: string;
    date: string;
    end_date: string;
    images: { img_url: string }[] | File[];
  }