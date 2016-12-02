import { CityPipe } from './city.pipe';


describe('CityPipe', () => {

    let cityPipe = new CityPipe();

    it('should transform "Graz" to long "Flughafen Graz Thalerhof"', () => {
        expect(cityPipe.transform('Graz')).toBe('Flughafen Graz Thalerhof');
    });

    it('should transform "Graz" to short "GRZ" when second parameter is short', () => {
        expect(cityPipe.transform('Graz', 'short')).toBe('GRZ');
    });

    it('should transform a not existing city to "ROM"', () => {
        expect(cityPipe.transform('Angular City')).toBe('ROM');
    });
});
