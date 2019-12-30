import { callGraphql } from '../../test-utils/callGraphql';

const statusQ = `query geocodeTest($address:$String!) {geocode(address: $address)}`;

beforeAll(async () => {});
afterAll(async () => {});

describe('Geocode', () => {
	it('should return lat and lon', async () => {
		const dataToInsert = {
			address: 'Washington D.C.'
		};

		const response = await callGraphql({
			source: statusQ,
			variableValues: dataToInsert
		});

		expect(response).toMatchObject({
			geocode: {
				status: 'OK'
			}
		});
	});
});
