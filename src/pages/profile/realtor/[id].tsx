import { RealtorProfile } from "@/types/RealtorProfile";
import { UserContextType } from "@/types/UserContextType";
import MainInfo from "components/MainInfo";
import UserContext from "context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { LastExp } from "@/types/LastExp";
import LoadingContext from "context/LoadingContext";
import ConvertToPDF from "components/realtor-profile-page/ConvertToPDF";
import ServicesCard from "components/realtor-profile-page/ServicesCard";
import AwardsCard from "components/realtor-profile-page/AwardsCard";
import CoursesCard from "components/realtor-profile-page/CoursesCard";
import CommentsCard from "components/realtor-profile-page/CommentsCard";
import PropertiesCard from "components/realtor-profile-page/PropertiesCard";
import { ApiService } from "@/services/ApiService";
import PartnershipCard from "components/realtor-profile-page/PartnershipCard";
import AboutCard from "components/realtor-profile-page/AboutCard";
import Complaint from "components/realtor-profile-page/Complaint";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  /* transform: translateY(-15px); */
  padding: 0px 32px 32px 32px;
  gap: 2rem;

  @media only screen and (max-width: 768px) {
    padding: 0 32px;
  }
  .plus {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
  }
  .hide-profile {
    background-color: #d3d2d2;
    width: 65%;
    height: 140px;
    max-width: calc(100% - 270px);
    position: fixed;
    z-index: 5;
    top: 0;
    right: 0;
  }
`;

export default function Profile() {
  const [realtor, setRealtor] = useState<RealtorProfile>();

  const [lastExp, setLastExp] = useState<LastExp>();

  const [sessionProfile, setSessionProfile] = useState(false);

  const { user } = useContext(UserContext) as UserContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [localId, setLocalId] = useState("");

  const [accType, setAccType] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const pdfPage = router.query.pdf ? true : false;
  const apiService = new ApiService();

  useEffect(() => {
    const localStorageId = localStorage.getItem("id");
    const accountType = localStorage.getItem("accountType");

    if (localStorageId) {
      setLocalId(localStorageId);
    }
    if (accountType) {
      setAccType(accountType);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoadingOpen(true);

        const data = await apiService.getRealtorInformation(id as string);
        setRealtor(data);

        const responsePartnerships = await apiService.getRealtorPartnership(
          id as string
        );

        setLastExp({
          name: responsePartnerships[0]?.name,
          pic: responsePartnerships[0]?.pic,
        });
        setLoadingOpen(false);
        window.scrollTo(0, 0);
      }
    };
    const localId = localStorage.getItem("id") as string;
    if (Number(id) === Number(localId) && accType === "realtor")
      setSessionProfile(true);

    fetchData();
  }, [id, user.id, accType, setLoadingOpen]);

  return (
    <Container>
      {!pdfPage && (
        <ConvertToPDF
          localId={localId}
          accType={accType}
          sessionProfile={sessionProfile}
        />
      )}
      <MainInfo
        isRealtor={true}
        lastExp={lastExp as LastExp}
        userSigned={realtor as RealtorProfile}
        isProfile={true}
        pdfPage={pdfPage}
      />
      <ServicesCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <AboutCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
        pdfPage={pdfPage}
      />
      <PropertiesCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
        pdfPage={pdfPage}
      />
      <AwardsCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <CoursesCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <PartnershipCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <CommentsCard
        localId={localId}
        accType={accType}
        sessionProfile={sessionProfile}
        pdfPage={pdfPage}
      />
      <Complaint
        localId={localId}
        accType={accType}
        sessionProfile={sessionProfile}
        pdfPage={pdfPage}
      />
      {/* {pdfPage && <div className="hide-profile"></div>} */}
    </Container>
  );
}
