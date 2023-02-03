export interface User {
 id: number,
 username: string,
 pokemon:Pokemon[]
}
interface Pokemon{
  name: string,
  image: string,
}
