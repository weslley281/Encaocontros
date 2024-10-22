export interface ICreatePetDTO {
  pet_id?: number;
  photo?: string;
  animal: string;
  name: string;
  birthday: Date;
  breed: string;
  gender: string;
  owner_id: number;
  vaccination_status: string;
  health_conditions: string;
  pedigree: boolean;
}