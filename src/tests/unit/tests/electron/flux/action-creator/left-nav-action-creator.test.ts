// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CardSelectionActions } from 'background/actions/card-selection-actions';
import { Action } from 'common/flux/action';
import { LeftNavActionCreator } from 'electron/flux/action-creator/left-nav-action-creator';
import { LeftNavActions } from 'electron/flux/action/left-nav-actions';
import { LeftNavItemKey } from 'electron/types/left-nav-item-key';
import { IMock, Mock, MockBehavior } from 'typemoq';

describe('LeftNavActionCreator', () => {
    let leftNavActionsMock: IMock<LeftNavActions>;
    let cardSelectionActionsMock: IMock<CardSelectionActions>;
    let actionCreator: LeftNavActionCreator;

    beforeEach(() => {
        leftNavActionsMock = Mock.ofType<LeftNavActions>(undefined, MockBehavior.Strict);
        cardSelectionActionsMock = Mock.ofType<CardSelectionActions>(
            undefined,
            MockBehavior.Strict,
        );
        actionCreator = new LeftNavActionCreator(
            leftNavActionsMock.object,
            cardSelectionActionsMock.object,
        );
    });

    it('itemSelected', () => {
        const itemSelectedMock = Mock.ofType<Action<LeftNavItemKey>>();
        leftNavActionsMock
            .setup(actions => actions.itemSelected)
            .returns(() => itemSelectedMock.object)
            .verifiable();

        const navigateToNewCardsViewMock = Mock.ofType<Action<void>>();
        cardSelectionActionsMock
            .setup(actions => actions.navigateToNewCardsView)
            .returns(() => navigateToNewCardsViewMock.object)
            .verifiable();

        const expectedKey: LeftNavItemKey = 'needs-review';

        itemSelectedMock.setup(m => m.invoke(expectedKey)).verifiable();
        navigateToNewCardsViewMock.setup(m => m.invoke(null)).verifiable();

        actionCreator.itemSelected(expectedKey);

        itemSelectedMock.verifyAll();
        leftNavActionsMock.verifyAll();
        navigateToNewCardsViewMock.verifyAll();
        cardSelectionActionsMock.verifyAll();
    });

    it.each([[true], [false]])('setLeftNavVisible', testValue => {
        const setLeftNavVisibleMock = Mock.ofType<Action<boolean>>();
        leftNavActionsMock
            .setup(actions => actions.setLeftNavVisible)
            .returns(() => setLeftNavVisibleMock.object)
            .verifiable();

        setLeftNavVisibleMock.setup(m => m.invoke(testValue)).verifiable();

        actionCreator.setLeftNavVisible(testValue);

        setLeftNavVisibleMock.verifyAll();
        leftNavActionsMock.verifyAll();
    });
});
