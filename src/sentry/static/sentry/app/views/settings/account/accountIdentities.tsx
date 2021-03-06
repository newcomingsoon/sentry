import React from 'react';
import {RouteComponentProps} from 'react-router/lib/Router';
import styled from '@emotion/styled';

import {disconnectIdentity} from 'app/actionCreators/account';
import Button from 'app/components/button';
import {Panel, PanelBody, PanelHeader, PanelItem} from 'app/components/panels';
import {t} from 'app/locale';
import {Identity} from 'app/types';
import AsyncView from 'app/views/asyncView';
import EmptyMessage from 'app/views/settings/components/emptyMessage';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';

const ENDPOINT = '/users/me/social-identities/';

type Props = RouteComponentProps<{}, {}>;

type State = {
  identities: Identity[] | null;
} & AsyncView['state'];

class AccountIdentities extends AsyncView<Props, State> {
  getDefaultState() {
    return {
      ...super.getDefaultState(),
      identities: [],
    };
  }

  getEndpoints(): ReturnType<AsyncView['getEndpoints']> {
    return [['identities', ENDPOINT]];
  }

  getTitle() {
    return t('Identities');
  }

  handleDisconnect = (identity: Identity) => {
    const {identities} = this.state;

    this.setState(
      state => {
        const newIdentities = state.identities?.filter(({id}) => id !== identity.id);

        return {
          identities: newIdentities ?? [],
        };
      },
      () =>
        disconnectIdentity(identity).catch(() => {
          this.setState({
            identities,
          });
        })
    );
  };

  renderBody() {
    return (
      <div>
        <SettingsPageHeader title="Identities" />
        <Panel>
          <PanelHeader>{t('Identities')}</PanelHeader>
          <PanelBody>
            {!this.state.identities?.length ? (
              <EmptyMessage>
                {t('There are no identities associated with this account')}
              </EmptyMessage>
            ) : (
              this.state.identities.map(identity => (
                <IdentityPanelItem key={identity.id}>
                  <div>{identity.providerLabel}</div>

                  <Button
                    size="small"
                    onClick={this.handleDisconnect.bind(this, identity)}
                  >
                    {t('Disconnect')}
                  </Button>
                </IdentityPanelItem>
              ))
            )}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

const IdentityPanelItem = styled(PanelItem)`
  align-items: center;
  justify-content: space-between;
`;

export default AccountIdentities;
