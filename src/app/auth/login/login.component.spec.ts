import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('LoginService', () => {
  let service: AuthService;
  let angularFireAuthStub: Partial<AngularFireAuth>;

  beforeEach(() => {
    angularFireAuthStub = {
      signInWithEmailAndPassword: jasmine.createSpy().and.resolveTo({}),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', async () => {
    const email = 'beshobassem@gmail.com';
    const password = '12345678';

    try {
      const userCredential = await service.login(email, password);
      expect(userCredential).toBeTruthy();
      expect(
        angularFireAuthStub.signInWithEmailAndPassword
      ).toHaveBeenCalledWith(email, password);
    } catch (error) {
      fail('Login failed');
    }
  });

  it('should handle login failure', async () => {
    const email = 'beshobassem@gmail.com';
    const password = '5985579';

    angularFireAuthStub.signInWithEmailAndPassword = jasmine
      .createSpy()
      .and.rejectWith(new Error('Login failed'));

    try {
      await service.login(email, password);
      fail('Login should have failed');
    } catch (error: any) {
      expect(error.message).toBe('Login failed');
      expect(
        angularFireAuthStub.signInWithEmailAndPassword
      ).toHaveBeenCalledWith(email, password);
    }
  });
});
