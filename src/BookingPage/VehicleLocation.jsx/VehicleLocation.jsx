function VehicleLocation() {
  return (
    <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <span className="text-blue-600 font-bold text-3xl">2.</span>
        Vehicle Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-3 text-lg">
            Vehicle Type
          </label>
          <select className="w-full p-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Hatchback</option>
            <option>Sedan</option>
            <option>SUV / Crossover</option>
            <option>Pickup / Double Cabin</option>
            <option>Van / Minibus</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-3 text-lg">
            Service Location
          </label>
          <select className="w-full p-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled selected>
              Select an area in Nairobi
            </option>

            <optgroup label="Westside (Westlands area)">
              <option>Westlands</option>
              <option>Kilimani</option>
              <option>Kileleshwa</option>
              <option>Lavington</option>
              <option>Parklands</option>
              <option>Spring Valley</option>
              <option>Kangemi</option>
            </optgroup>

            <optgroup label="Eastside (Eastlands / Embakasi)">
              <option>Embakasi</option>
              <option>South B</option>
              <option>South C</option>
              <option>Donholm</option>
              <option>Umoja</option>
              <option>Buru Buru</option>
            </optgroup>

            <optgroup label="North (Kasarani / Gigiri area)">
              <option>Kasarani</option>
              <option>Runda</option>
              <option>Gigiri</option>
              <option>Muthaiga</option>
              <option>Roysambu</option>
              <option>Ruaka</option>
            </optgroup>

            <optgroup label="South (Karen / Lang'ata area)">
              <option>Karen</option>
              <option>Lang'ata</option>
              <option>Nairobi West</option>
              <option>Madaraka</option>
              <option>Ongata Rongai</option>
            </optgroup>
          </select>
        </div>
      </div>
    </section>
  );
}

export default VehicleLocation;
