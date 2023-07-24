export interface SecurityDocument {
   created_at: string;
   created_by: string;
   created_by_id: string;
   deleted_at: string | null;
   deleted_by: string | null;
   deleted_by_id: string | null;
   id: string;
   name: string;
   status: string;
   type: string;
   updated_at: string | null;
   updated_by: string | null;
   updated_by_id: string | null;
}

export interface ModalWithCheckBoxItem {
   labelName: string;
   checked: boolean;
}

export interface ModalWithCheckBoxItemChildren extends ModalWithCheckBoxItem {
   children?: Array<ModalWithCheckBoxItem>;
}
