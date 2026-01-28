export interface LocationType{
    latitude:number|undefined,
    longitude:number|undefined
}

export interface LocationWithDescType{
    latitude:number|undefined,
    longitude:number|undefined,
    location_desc:string|null
}


export type locationDescType={
        pickup:string|null,
        drop:string|null
}