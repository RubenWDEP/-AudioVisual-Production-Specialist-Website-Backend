export interface Comment {
  name: string;
  section: string;
  email: string;
  comment: string;
}

interface IUser extends RowDataPacket {
  warningStatus: number;
}
