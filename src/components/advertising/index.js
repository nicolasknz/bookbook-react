import React from 'react';
import { Icon } from 'semantic-ui-react';

import AdKenzie from '../../assets/img/ad-kenzie.png';
import LogoKA from '../../assets/img/logoKA.svg';
import { StyledAd, StyledAdTitle, StyledAdText, StyledTimeline, StyledAdFooter } from '../styled';

const Advertising = () => {
  return (
    <StyledTimeline>
      <StyledAd>
        <a href='https://kenzie.com.br'><img src={LogoKA} alt="logo-kenzie" /></a>
        <StyledAdTitle>
          <span>
            Kenzie Academy{' '}
            <h6>
              <Icon name="check circle" color="blue" />
            </h6>
          </span>
          <p>
            Patrocinado
            <h6>
              <Icon name="world" color="grey" />
            </h6>
          </p>
        </StyledAdTitle>
        <StyledAdText>
          Aprenda com os melhores profissionais a se tornar um desenvolvedor completo. Nosso
          interesse é que você tenha uma experiência incrível e saia contratado pelas melhores
          empresas de tecnologia. <br />
          Nós investimos em você. Aprenda programação sem mensalidade até conseguir uma remuneração
          de pelo menos R$3.000 por mês.
          <br />
          Inscrições abertas para turma de Outubro/2020.
          <br />
          Se inscreva em nosso processo seletivo{' '}
          <a href="https://kenzie.com.br/">linktr.ee/kenzieacademybr</a>
        </StyledAdText>
        <StyledAdFooter>
          <a href='https://kenzie.com.br'><img src={AdKenzie} alt="outubro" /></a>
          <Icon name="thumbs up outline" color="blue" />
          <Icon name="heart" color="red" />
          <Icon name="smile" color="yellow" />
        </StyledAdFooter>
      </StyledAd>
    </StyledTimeline>
  );
};

export default Advertising;
