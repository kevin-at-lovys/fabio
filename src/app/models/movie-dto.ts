export class MovieDto {
    public id : number;
    public userId : string;
    public title :  string;
    public overview :  string;
    public releaseDate :  Date;
    public thumbnailImage :  string;
    public popularity :  string;
    public favorite: boolean = true;
}
