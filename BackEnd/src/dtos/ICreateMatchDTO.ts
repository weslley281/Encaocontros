export interface ICreateMatchDTO {
  match_id?: number;
  user1_id: number;
  user2_id: number;
  pet1_id: number;
  pet2_id: number;
  status: string;
}
