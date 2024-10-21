import multer from 'multer';
import path from 'path';

// Configurando o armazenamento de arquivos com Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Middleware para lidar com o upload de uma única foto
const upload = multer({ storage });

export { upload };