import { ArgumentMetadata, ConsoleLogger, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidatorPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata) {

        console.log(value, metadata);
        const { metatype } = metadata;

        if (this.isEmpty(value)) {
            throw new HttpException('Falha de validação, nenhum dado foi passado', HttpStatus.BAD_REQUEST);
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        
        if (errors.length > 0) {
            throw new HttpException(`Falha de validação: ${this.formartErrors(errors)}`, HttpStatus.BAD_REQUEST);
        }

        return value;

    }


    private formartErrors(errors: ValidationError[]) {
        return errors.map(error => {
            for (let key in error.constraints) {
                return error.constraints[key]
            }
        }).join(', ');
    }

    private isEmpty(value: any): boolean {
        if (Object.keys(value).length < 1) {
            return true;
        }
        return false;
    }


}