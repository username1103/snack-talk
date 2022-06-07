import path from 'path';

export const getEntityPath = () => {
  return path.resolve(__dirname, './src/domain/**/*.entity.{ts,js}');
};
