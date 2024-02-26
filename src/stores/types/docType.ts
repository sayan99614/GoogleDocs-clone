export type Doc={
    id?:string 
    title:string,
    content:string,
    uId:string,
    dateModified: string
    searchTitle?:string
}

export type updatedData={
    title?:string,
    content?:string,
    dateModified?:string
    searchTitle?:string
}