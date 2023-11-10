import { AddCommentForm } from "@/types/AddCommentForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    position: relative;
    height: auto;
    padding: 3rem 2rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-top: 4rem;

    @media (max-width: 600px) {
      width: 80%;
    }
    div {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 80%;
      input {
        flex-shrink: 0;
      }
      p {
        font-weight: bold;
      }
    }
  }
  textarea {
    min-height: 20rem;
  }
  .redirect {
    position: absolute;
    top: 50%;
    font-weight: bold;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }
`;

type AddComplaintModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddComplaintModal = ({ open, setOpen }: AddComplaintModalProps) => {
  const [marketExpertiseRating, setMarketExpertiseRating] = useState(0);
  const [responsivenessRating, setResponsivenessRating] = useState(0);
  const [negotiationSkillsRating, setNegotiationSkillsRating] = useState(0);
  const [
    profissionalismAndComunicationRating,
    setProfissionalismAndComunicationRating,
  ] = useState(0);

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [accType, setAccType] = useState("");

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  const [formValues, setFormValues] = useState({
    morada: false,
    precoErrado: false,
    fraude: false,
    fotoIncorreta: false,
    vendido: false,
    telefoneInvalido: false,
    emailInvalido: false,
    descricao: "",
  });

  const handleChange = (name: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: !prevValues[name],
    }));
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      descricao: e.target.value,
    }));
  };

  const profileType = router.pathname.includes("agency") ? "agency" : "realtor";
  const { id: profileId } = router.query;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const localId = localStorage.getItem("id");

    setLoadingOpen(true);

    console.log(formValues);

    setLoadingOpen(false);
  };

  useEffect(() => {
    const accountType = localStorage.getItem("accountType");

    if (accountType) {
      setAccType(accountType);
    }
  }, [open]);

  return open ? (
    <Container className="modal">
      <form onSubmit={(e) => onSubmit(e)} action="">
        {accType === "client" ? (
          <>
            <h3>{t.complaint.formTitle}</h3>
            <div className="label-group">
              <input
                type="checkbox"
                name="Morada mal"
                id="morada"
                checked={formValues["morada"] || false}
                onChange={() => handleChange("morada")}
              />
              <label htmlFor="morada">
                <p>{t.complaint.opt1}</p>
              </label>
            </div>
            <div className="label-group">
              <input
                type="checkbox"
                name="Preço incorreto"
                id="preco"
                checked={formValues["precoErrado"] || false}
                onChange={() => handleChange("precoErrado")}
              />
              <label htmlFor="preco">
                <p>{t.complaint.opt2}</p>
              </label>
            </div>
            <div className="label-group">
              <input
                type="checkbox"
                name="Fraude"
                id="fraude"
                checked={formValues["fraude"] || false}
                onChange={() => handleChange("fraude")}
              />
              <label htmlFor="fraude">
                <p>{t.complaint.opt3}</p>
              </label>
            </div>
            <div className="label-group">
              <input
                type="checkbox"
                name="Erros na foto"
                id="foto"
                checked={formValues["fotoIncorreta"] || false}
                onChange={() => handleChange("fotoIncorreta")}
              />
              <label htmlFor="foto">
                <p>{t.complaint.opt4}</p>
              </label>
            </div>
            <div className="label-group">
              <input
                type="checkbox"
                name="Já foi vendido"
                id="vendido"
                checked={formValues["vendido"] || false}
                onChange={() => handleChange("vendido")}
              />
              <label htmlFor="vendido">
                <p>{t.complaint.opt5}</p>
              </label>
            </div>
            <div className="label-group">
              <input
                type="checkbox"
                name="Telefone errado"
                id="telefone"
                checked={formValues["telefoneInvalido"] || false}
                onChange={() => handleChange("telefoneInvalido")}
              />
              <label htmlFor="telefone">
                <p>{t.complaint.opt6}</p>
              </label>
            </div>
            <div className="label-group">
              <input
                type="checkbox"
                name="Email errado"
                id="email"
                checked={formValues["emailInvalido"] || false}
                onChange={() => handleChange("emailInvalido")}
              />
              <label htmlFor="email">
                <p>{t.complaint.opt7}</p>
              </label>
            </div>
            <textarea
              placeholder={t.complaint.desc}
              value={formValues.descricao}
              onChange={handleDescricaoChange}
            />
            <p className="close" onClick={() => setOpen(false)}>
              X
            </p>
            <button type="submit"> {t.complaint.submit} </button>
          </>
        ) : (
          <>
            <p className="close" onClick={() => setOpen(false)}>
              X
            </p>
            <p className="redirect">Faça login como cliente</p>
          </>
        )}
      </form>
    </Container>
  ) : (
    <></>
  );
};

export default AddComplaintModal;
