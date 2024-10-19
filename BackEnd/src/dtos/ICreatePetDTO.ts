export interface ICreatePetDTO {
  pet_id?: number;
  animal: string;
  name: string;
  age: number;
  breed: string;
  gender: string;
  owner_id: number;
  vaccination_status: string;
  health_conditions: string;
  pedigree: boolean;
}
