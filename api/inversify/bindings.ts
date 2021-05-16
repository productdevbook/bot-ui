import { Container } from 'inversify';
import { AuthController } from '../controllers/auth-controller';
import { Jwt } from '~/utils/jwt';

export function bind(container: Container): void {
  container.bind<AuthController>(AuthController).to(AuthController);
  container.bind<Jwt>(Jwt).to(Jwt);
}
