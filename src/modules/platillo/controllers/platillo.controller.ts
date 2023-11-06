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
  UploadedFile,
  UseInterceptors,
  Res,
  BadRequestException,
  //UseGuards,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { platilloDTO } from '../dto/platillo.dto';
import { platilloPatchDTO } from '../dto/platilloPatch.dto';
import { PlatilloService } from '../services/platillo.service';
import { isObjectId } from 'src/common/functions/validators';
import { of } from 'rxjs';

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.avi', '.mp4', '.jpg', '.png', '.mp3'];
  const ext = extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Tipo de archivo no admitido'));
  }
};

@Controller('hotel_api/platillos')
export class PatilloController {
  constructor(private readonly platilloService: PlatilloService) {}

  @Post()
  //@UseGuards(JwtGuard)
  async create(@Body() platillo: platilloDTO) {
    const response = await this.platilloService.create(platillo);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Platillo creó con éxito.',
    };
  }

  @Get()
  //@UseGuards(JwtGuard)
  async findAll(@Query('limit') limit = 10, @Query('page') page = 0) {
    const response = await this.platilloService.findAll(limit, page);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Platillos recuperados con éxito.',
    };
  }

  @Get(':id')
  //@UseGuards(JwtGuard)
  async find(@Param('id') id: string) {
    const response = await this.platilloService.find(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: { ...response },
      message: 'Platillo recuperado con éxito.',
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
    const ext = extname(file.originalname).toLowerCase();
    if (['.jpg', '.png'].includes(ext)) {
      response = await this.platilloService.patch(isObjectId(id), {
        foto: file.filename,
      });
    } else if (['.mp3'].includes(ext)) {
      response = await this.platilloService.patch(isObjectId(id), {
        audio: file.filename,
      });
    } else {
      response = await this.platilloService.patch(isObjectId(id), {
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
  downloadFile(
    @Param('nombreArchivo') nombreArchivo: string,
    @Res() res: Response,
  ) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + nombreArchivo)));
  }

  @Patch(':id')
  //@UseGuards(JwtGuard)
  async patch(@Param('id') id: string, @Body() platillo: platilloPatchDTO) {
    const response = await this.platilloService.patch(isObjectId(id), platillo);
    return {
      statusCode: HttpStatus.OK,
      data: { ...response },
      message: 'Platillo modificado con éxito.',
    };
  }

  @Delete(':id')
  //@UseGuards(JwtGuard)
  async delete(@Param('id') id: string) {
    const response = await this.platilloService.delete(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: { ...response },
      message: 'Platillo aliminado con éxito..',
    };
  }
}
