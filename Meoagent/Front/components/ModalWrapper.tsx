import AddPropertyModalContext from 'context/AddPropertyModalContext';
import AddServiceModalContext from 'context/AddServiceModalContext';
import MainInfoProfileEditModalContext from 'context/MainInfoProfileEditModalContext';
import PictureModalContext from 'context/PictureModalContext';
import SearchContext from 'context/SearchContext';
import SearchResultContext from 'context/SearchResultContext';
import UserContext from 'context/UserContext';
import React, { useEffect, useState } from 'react';
import ProfilePictureModal from './ProfilePictureModal';
import MainInfoProfileEditModal from './MainInfoProfileEditModal';
import AddPropertyModal from './AddPropertyModal';
import AddServiceModal from './AddServiceModal';
import { PictureModalData } from '@/types/PictureModalData';
import { User } from '@/types/User';
import { RealtorList } from '@/types/RealtorList';
import { RealtorProfile } from '@/types/RealtorProfile';
import AddAwardModal from './AddAwardModal';
import AddAwardModalContext from 'context/AddAwardModalContext';
import AddPartnershipModal from './AddPartnershipModal';
import AddPartnershipModalContext from 'context/AddPartnershipModalContext';
import AddCourseModal from './AddCourseModal';
import AddCourseModalContext from 'context/AddCourseModalContext';
import AboutEditModal from './AboutEditModal';
import AboutEditModalContext from 'context/AboutEditModalContext';
import AddCommentModal from './AddCommentModal';
import AddCommentModalContext from 'context/AddCommentModalContext';
import AddCityModalContext from 'context/AddCityModalContext';
import AddCityModal from './AddCityModal';
import AddLanguageModalContext from 'context/AddLanguageModalContext';
import AddLanguageModal from './AddLanguageModal';
import MainInfoAgencyEditModalContext from 'context/MainInfoAgencyEditModal';
import LoadingContext from 'context/LoadingContext';
import Loading from './Loading';
import AddReplyModal from './AddReplyModal';
import AddReplyModalContext from 'context/AddReplyModalContext';

type ModalWrapperProps = {
  children: React.ReactNode
}

const ModalWrapper = ({ children }: ModalWrapperProps) => {
  const [dataPictureModal, setDataPictureModal] = useState<PictureModalData>({
    open: false,
    userSigned: null
  })

  const [openAddPropertyModal, setOpenAddPropertyModal] = useState(false)

  const [openAddServiceModal, setOpenAddServiceModal] = useState(false)

  const [openMainInfoModal, setOpenMainInfoModal] = useState(false)

  const [openMainInfoAgencyModal, setOpenMainInfoAgencyModal] = useState(false)

  const [openAwardModal, setOpenAwardModal] = useState(false)

  const [openCourseModal, setOpenCourseModal] = useState(false)

  const [openAboutEditModal, setOpenAboutEditModal] = useState(false)

  const [openPartnershipModal, setOpenPartnershipModal] = useState(false)

  const [openAddCommentModal, setOpenAddCommentModal] = useState(false)

  const [openAddReplyModal, setOpenAddReplyModal] = useState({
    open:false,
    commentId:0,
    reply:''
  })

  const [openAddCityModal, setOpenAddCityModal] = useState(false)

  const [openAddLanguageModal, setOpenAddLanguageModal] = useState(false)

  const [loadingOpen, setLoadingOpen] = useState(false)

  const [user, setUser] = useState<User>({
    id: null,
    token:'',
    profilePicture: null,
    coverPicture: null,
    accountType: ''
  })

  const [search, setSearch] = useState('')

  const [searchResult, setSearchResult] = useState<RealtorList>({
    list: [] as RealtorProfile [],
    currentPage: 0,
    totalOfPages: 0
  })

  useEffect(() => { console.log(openMainInfoAgencyModal)}, [openMainInfoAgencyModal])

  useEffect(() => {
    setUser({
      token: localStorage.getItem('token') as string,
      id: null,
      profilePicture: null,
      coverPicture: null,
      accountType: null
    })
  }, [])

  return (
    <div>
      <SearchContext.Provider value = {{search, setSearch}}>
      <SearchResultContext.Provider value = {{ searchResult, setSearchResult}}>
      <UserContext.Provider value = {{user, setUser}}>
      <PictureModalContext.Provider value = {{data: dataPictureModal, setData: setDataPictureModal}}>
      <MainInfoProfileEditModalContext.Provider value= {{open:openMainInfoModal, setOpen:setOpenMainInfoModal}}>
      <AddPropertyModalContext.Provider value={{open: openAddPropertyModal, setOpen: setOpenAddPropertyModal}}>
      <AddServiceModalContext.Provider value={{open: openAddServiceModal, setOpen: setOpenAddServiceModal}}>
      <AddAwardModalContext.Provider value={{open: openAwardModal, setOpen: setOpenAwardModal}}>
      <AddPartnershipModalContext.Provider value={{open: openPartnershipModal, setOpen: setOpenPartnershipModal}} >
      <AddCourseModalContext.Provider value={{open: openCourseModal, setOpen: setOpenCourseModal}}>
      <AboutEditModalContext.Provider value={{open: openAboutEditModal, setOpen: setOpenAboutEditModal}}>
      <AddCommentModalContext.Provider value={{open: openAddCommentModal, setOpen: setOpenAddCommentModal}}>
      <AddCityModalContext.Provider value={{open: openAddCityModal, setOpen: setOpenAddCityModal}}>
      <AddLanguageModalContext.Provider value={{open: openAddLanguageModal, setOpen: setOpenAddLanguageModal}}>
      <MainInfoAgencyEditModalContext.Provider value= {{open:openMainInfoAgencyModal, setOpen:setOpenMainInfoAgencyModal}}>
      <LoadingContext.Provider value={{open:loadingOpen, setOpen:setLoadingOpen}}>
      <AddReplyModalContext.Provider value={{state:openAddReplyModal, setOpen:setOpenAddReplyModal}}>

        <AddReplyModal state={openAddReplyModal} setOpen={setOpenAddReplyModal} />
        <AddCommentModal open={openAddCommentModal} setOpen={setOpenAddCommentModal}/>
        <ProfilePictureModal data={dataPictureModal} setData={setDataPictureModal}/>    
        <MainInfoProfileEditModal open={openMainInfoModal} setOpen={setOpenMainInfoModal}/>
        <AddPropertyModal open={openAddPropertyModal} setOpen={setOpenAddPropertyModal}/>
        <AddServiceModal open={openAddServiceModal} setOpen={setOpenAddServiceModal}/>
        <AddAwardModal open={openAwardModal} setOpen={setOpenAwardModal}/>
        <AddCourseModal open={openCourseModal} setOpen={setOpenCourseModal}/>
        <AboutEditModal open={openAboutEditModal} setOpen={setOpenAboutEditModal}/>
        <AddPartnershipModal open={openPartnershipModal} setOpen={setOpenPartnershipModal}/>
        <AddCityModal open={openAddCityModal} setOpen={setOpenAddCityModal}/>
        <AddLanguageModal open={openAddLanguageModal} setOpen={setOpenAddLanguageModal}/>
        <MainInfoProfileEditModal open={openMainInfoAgencyModal} setOpen={setOpenMainInfoAgencyModal}/>
        <Loading open={loadingOpen} setOpen={setLoadingOpen}/>
        {children}
      </AddReplyModalContext.Provider>
      </LoadingContext.Provider>
      </MainInfoAgencyEditModalContext.Provider>
      </AddLanguageModalContext.Provider>
      </AddCityModalContext.Provider>
      </AddCommentModalContext.Provider>
      </AboutEditModalContext.Provider>
      </AddCourseModalContext.Provider>        
      </AddPartnershipModalContext.Provider>
      </AddAwardModalContext.Provider>
      </AddServiceModalContext.Provider>
      </AddPropertyModalContext.Provider>
      </MainInfoProfileEditModalContext.Provider>
      </PictureModalContext.Provider>
      </UserContext.Provider>
      </SearchResultContext.Provider>
      </SearchContext.Provider>
    </div>
  );
};

export default ModalWrapper;