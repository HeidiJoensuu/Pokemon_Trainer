export interface Pokemon {
    name: string,
    url: string,
    picture?: string
    stats: Stats
    abilities: abilities
}



interface Stats {
    hp: string,
    defense: string,
    specialAttack:string,
    specialDefense: string,
    speed: string

}
interface abilities {
    abilities: []
}