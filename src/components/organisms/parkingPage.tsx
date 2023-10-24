import ImageGallery from '@components/molecules/imageGallery/imageGallery';
import { ReactNode } from 'react';

const ParkingPageContent = ({ parking }: { parking?: Parking }) => {
  const facilities = (parking: Parking): ReactNode => {
    let facilityNodes: ReactNode[] = [];
    Object.keys(parking.facilities).forEach((key, index) => {
      facilityNodes.push(
        <div>
          {key}: {parking.facilities[key] ? <span>yes</span> : <span>no</span>}
        </div>
      );
    });
    return facilityNodes;
  };

  if (!parking) {
    return <div>No Parking found for this id</div>;
  }

  return (
    <div>
      <ImageGallery images={parking.image_urls} />
      ParkingPage for {parking.name}
    </div>
  );
};

export default ParkingPageContent;
