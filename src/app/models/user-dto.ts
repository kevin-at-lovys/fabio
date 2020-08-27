import { MovieDto } from './movie-dto';

export class UserDto {
    userId: string;
    username : string;
    password : string;
    favorites : MovieDto[];
}
