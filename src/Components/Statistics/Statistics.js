import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import * as GLOBAL from './../../Common/consts';
import './Statistics.css'

export default function SingleColumnDemo() {
  let countries = GLOBAL.COUNTRIES;
  const [cases, setCase] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    fetch(`https://api.covid19api.com/summary`)
      .then((res) => res.json())
      .then((data) => {
        data.success === undefined ? setCase(data.Countries) : setCase(countries);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [searchInput === '' && searchInput]);

  useEffect(() => {
    if (searchInput?.length > 0) {
      setCase(cases.filter(
        (country) => {
          return country.Country.toLowerCase().includes(searchInput.toLowerCase()) && country;
        }
      ))
    }
  }, [searchInput]);

  return (
    <div>
      <div className='search-box'
      >
        <input
          type="text"
          placeholder="Search here on country name ..."
          className='search'
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput} />
      </div>

      <div className="card">
        <DataTable value={cases} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}>
          <Column field="Country" header="Countries" sortable ></Column>
          <Column field="CountryCode" header="Country Code" ></Column>
          <Column field="Slug" header="Slug" ></Column>
          <Column field="NewConfirmed" header="New Confirmed"  ></Column>
          <Column field="TotalConfirmed" header="Total Confirmed"  ></Column>
          <Column field="NewDeaths" header="New Deaths"  ></Column>
          <Column field="TotalDeaths" header="Total Deaths"  ></Column>
          <Column field="NewRecovered" header="New Recovered"  ></Column>
          <Column field="TotalRecovered" header="Total Recovered"  ></Column>
          <Column field="Date" header="Date" ></Column>
        </DataTable>
      </div>
    </div>
  );
}
