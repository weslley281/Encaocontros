class Match {
  match_id: number;
  user1_id: number;
  user2_id: number;
  pet1_id: number;
  pet2_id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    match_id: number,
    user1_id: number,
    user2_id: number,
    pet1_id: number,
    pet2_id: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.match_id = match_id;
    this.user1_id = user1_id;
    this.user2_id = user2_id;
    this.pet1_id = pet1_id;
    this.pet2_id = pet2_id;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { Match };
