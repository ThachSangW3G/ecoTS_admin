export class Material {
    id;
    name;
    pointsPerKg;
    co2SavedPerKg;
    constructor(id, name, pointsPerKg, co2SavedPerKg) {
        this.id = id;
        this.name = name;
        this.pointsPerKg = pointsPerKg;
        this.co2SavedPerKg = co2SavedPerKg;
    }
}