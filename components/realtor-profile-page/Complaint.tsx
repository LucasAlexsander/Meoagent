import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ButtonHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import closeIcon from "@/../public/close.svg";
import editIcon from "@/../public/edit.svg";
import {
  ModalOpenContextAddReply,
  ModalOpenContextType,
} from "@/types/ModalOpenContextType";
import { Comment } from "@/types/Comment";
import AddCommentModalContext from "context/AddCommentModalContext";
import LoadingContext from "context/LoadingContext";
import { ApiService } from "@/services/ApiService";
import locales from "locales";
import AddReplyModalContext from "context/AddReplyModalContext";
import AddComplaintModalContext from "context/AddComplaintModalContext";
import { ModalOpenContextAddComplaint } from "@/types/ModalOpenComplaintType";
import AddComplaintModal from "components/AddComplaintModal";

const Container = styled.div`
  .comments {
    background: #fff;
    padding: 3rem;
    align-items: flex-start;
    gap: 2rem;

    p {
      font-size: 1.8rem;
    }
  }
`;

interface ComplaintProps {
  localId: string;
  accType: string;
  sessionProfile: boolean;
  pdfPage: boolean;
}

export default function Complaint({
  localId,
  accType,
  sessionProfile,
  pdfPage = false,
}: ComplaintProps) {
  const [comments, setComments] = useState<Comment[]>();

  const [openCompaint, setOpenComplaint] = useState(false);

  const { user } = useContext(UserContext) as UserContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const router = useRouter();
  const { id } = router.query;
  const apiService = new ApiService();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoadingOpen(true);
        const commentData = await apiService.getRealtorComments(id as string);
        setLoadingOpen(false);

        console.log(commentData);

        let reverseComments = commentData.reverse();
        if (pdfPage) {
          reverseComments = reverseComments.filter(
            (comment: any, index: number) => {
              if (index < 5) {
                return comment;
              }
            }
          );
        }
        setComments(reverseComments);
      }
    };

    fetchData();
  }, [id, user.id, accType, setLoadingOpen]);

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;

    const { id } = target;

    const token = localStorage.getItem("token");

    setLoadingOpen(true);
    const response = await apiService.deleteComment(token as string, id);
    setLoadingOpen(false);

    if (response === "deleted") router.reload();
  };

  return (
    <Container>
      <div className="card comments">
        <h2>{t.complaint.title}</h2>
        <p>{t.complaint.subtitle}</p>
        <button onClick={() => setOpenComplaint(true)}>
          {t.complaint.button}
        </button>

        {openCompaint ? (
          <>
            <AddComplaintModal
              open={openCompaint}
              setOpen={setOpenComplaint}
            ></AddComplaintModal>
          </>
        ) : null}
      </div>
    </Container>
  );
}
