
type Districts = {
  [key: string]: {value: number, label: string}[];
}

export function makeDistrictValueInput (districts: District[]): Districts {
  let districtsTH: {value: number, label: string}[]= [] ;
  let districtsEN: {value: number, label: string}[]= [] ;
  districts.forEach((district) => {
    districtsEN.push({
      value: district.id,
      label: district.district_name_latin
    })
    districtsTH.push({
      value: district.id,
      label: district.district_name_latin
    })
  })

  return {
    'th': districtsTH,
    'en': districtsEN
  }

}
