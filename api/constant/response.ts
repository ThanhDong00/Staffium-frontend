
export type DepartmentResponse = {
  "_id": string
  "organization_id": string,
  "name": string,
  "size": number,
}
export type PositionResponse = {
  "_id": string,
  "organization_id": string,
  "name": string,
  "description": string | null,
}
export type StaffResponse = {
  "_id": string,
  "organization_id": string,
  "first_name": string,
  "last_name": string,
  "gender": string,
  "nationality": string,
  "birthdate": Date | null,
  "birthplace": string,
  "place_of_residence": string,
  "citizen_id": string,
  "phone": string | null,
  "email": string,
  "date_of_contract": Date | null,
  "contract_end_date": Date | null,
  "department": DepartmentResponse | undefined,
  "position": PositionResponse | undefined
}