import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  Res,
  //UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { personalidadPatchDTO } from '../dto/personalidadPatch.dto';
import { personalidadDTO } from '../dto/personalidad.dto';
import { PersonalidadService } from '../services/personalidad.services';
import { isObjectId } from 'src/common/functions/validators';

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.avi', '.mp4', '.jpg', '.png'];
  const ext = extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no admitido'));
  }
};

@Controller('hotel_api/personalidades')
export class PersonalidadController {
  constructor(private readonly personalidadService: PersonalidadService) {}

  @Post()
  //@UseGuards(JwtGuard)
  async create(@Body() personalidad: personalidadDTO) {
    const response = await this.personalidadService.create(personalidad);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Terminal created successfully.',
    };
  }

  @Get()
  //@UseGuards(JwtGuard)
  async findAll(@Query('limit') limit = 10, @Query('page') page = 0) {
    const response = await this.personalidadService.findAll(limit, page);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Terminals fetched successfully.',
    };
  }

  @Get(':id')
  //@UseGuards(JwtGuard)
  async find(@Param('id') id: string) {
    const response = await this.personalidadService.find(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Terminal fetched successfully.',
    };
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, `${uuidv4()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: fileFilter,
    }),
  )
  @Post('file/:id')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    let response;
    const allowedExtensions = ['.jpg', '.png'];
    const ext = extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      response = await this.personalidadService.patch(isObjectId(id), {
        foto: file.filename,
      });
    } else {
      response = await this.personalidadService.patch(isObjectId(id), {
        video: file.filename,
      });
    }

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Terminal updated successfully.',
    };
  }

  @Get('file/:nombreArchivo')
  descargarArchivo(
    @Param('nombreArchivo') nombreArchivo: string,
    @Res() res: Response,
  ) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + nombreArchivo)));
  }

  @Patch(':id')
  //@UseGuards(JwtGuard)
  async patch(
    @Param('id') id: string,
    @Body() personalidad: personalidadPatchDTO,
  ) {
    const response = await this.personalidadService.patch(
      isObjectId(id),
      personalidad,
    );
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Terminal updated successfully.',
    };
  }

  @Delete(':id')
  //@UseGuards(JwtGuard)
  async delete(@Param('id') id: string) {
    const response = await this.personalidadService.delete(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Terminal deleted successfully.',
    };
  }
}
