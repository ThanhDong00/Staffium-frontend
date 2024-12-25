export type SignUpForm = {
  username: string,
  password: string,
  roles: string[]
}

export type SignInForm = {
  username: string,
  password: string,
}

export type CreateOrgDTO = {
  name: string,
  size: number
}

export type CreateRequestForm = {
  day_off: Date,
  duration: number,
  type: string,
  proof: null
}