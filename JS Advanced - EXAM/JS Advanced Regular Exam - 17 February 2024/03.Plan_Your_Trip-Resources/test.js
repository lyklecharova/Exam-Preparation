const planYourTrip = require('./planYourTrip');
const { expect, assert } = require("fix-esm").require("chai");


describe('planYourTrip', () => {
    describe('choosingDestination', () => {

        it('If the year is different than 2024', () => {
            expect(() => planYourTrip.choosingDestination('Ski Resort', 'Winter', 2028)).to.throw('Invalid Year!');
        });

        it("should throw an error if the destination is different from 'Ski Resort'", () => {
            expect(() => planYourTrip.choosingDestination('Beach', 'Winter', 2024))
                .to.throw('This destination is not what you are looking for.');
        });

        it('If the season is Winter', () => {
            expect(planYourTrip.choosingDestination('Ski Resort', 'Winter', 2024))
                .to.equal('Great choice! The Winter is the perfect time to visit the Ski Resort.');
        });

        it(' if the above condition in not met', () => {
            expect(planYourTrip.choosingDestination('Ski Resort', 'Spring', 2024))
                .to.equal('Consider visiting during the Winter for the best experience at the Ski Resort.');
        });
    });

    describe('exploreOptions', () => {
        it('If passed activities parameter is not an array', () => {
            expect(() => planYourTrip.exploreOptions({}, '1')).to.throw('Invalid Information!');
        });
        it('If the activityIndex is not a number and is outside the limits of the array', () => {
            expect(() => planYourTrip.exploreOptions("Skiing ", "Snowboarding ", "Winter Hiking"), '10').to.throw('Invalid Information!');
        });
        it('If the activityIndex is not a integer number.', () => {
            expect(() => planYourTrip.exploreOptions("Skiing ", "Snowboarding ", "Winter Hiking"), 10).to.throw('Invalid Information!');
        });
        it('must remove an element (activity) from the array that is located on the index specified as a parameter', () => {
            expect(() => planYourTrip.exploreOptions(['Skiing', 'Snowboarding'], 2)).to.throw('Invalid Information!');
        });
        it('return the updated activities array as a string', () => {
            const result = planYourTrip.exploreOptions(['Skiing', 'Snowboarding', 'Winter Hiking'], 1);
            expect(result).to.equal('Skiing, Winter Hiking');
        });
    });

    describe('estimateExpenses', () => {
        it('If the total cost is greather to $500', () => {
            const distanceInKilometers = 450;
            const fuelCostPerLiter = 50;
            const result = planYourTrip.estimateExpenses(distanceInKilometers, fuelCostPerLiter);
            expect(result).to.equal('The estimated cost for the trip is $22500.00, plan accordingly.');
        });
        it('If the total cost is less or equal to $500', () => {
            const distanceInKilometers = 100;
            const fuelCostPerLiter = 5;
            const result = planYourTrip.estimateExpenses(distanceInKilometers, fuelCostPerLiter);
            expect(result).to.equal('The trip is budget-friendly, estimated cost is $500.00.');
        });
        it('throw an error if the fuelCostPerLiter is not a number, or is non-positive', () => {
            expect(() => planYourTrip.estimateExpenses('500', 100)).to.throw('Invalid Information!');
            expect(() => planYourTrip.estimateExpenses([], -5)).to.throw('Invalid Information!');
        })
    });
});
