import styled from 'styled-components';

const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 400px;
  min-height: 30rem;
  form {
    min-height: 30rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    h4 {
      font-size: 1.3rem;
    }
    h2 {
      margin-bottom: 2rem;
    }
    padding: 2rem 3rem;
  }

  @media (max-width: 1025px) {
    /* Tablet / Notebook */
    form {
      h4 {
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 768px) {
    /* Mobile */
    width: calc(100% - 30px);
    form {
      padding: 5rem 3rem;
      h4 {
        font-size: 2rem;
      }
    }
  }
`;

export default ForgotPasswordContainer;
