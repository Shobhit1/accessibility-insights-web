// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { IPoint } from '@uifabric/utilities';
import { Mock } from 'typemoq';

import { DrawerUtils } from '../../../../../injected/visualization/drawer-utils';
import {
    CircleConfiguration,
    LineConfiguration,
    TextConfiguration,
} from '../../../../../injected/visualization/formatter';
import { SVGShapeFactory } from '../../../../../injected/visualization/svg-shape-factory';

describe('SVGShapeFactoryTest', () => {
    const drawerUtilsMock = Mock.ofType(DrawerUtils);
    let testObject: SVGShapeFactory;
    const defaultTestLineConfiguration: LineConfiguration = {
        stroke: '#ffffff',
        strokeWidth: '1',
        strokeDasharray: '3 3',
    };

    const defaultTestFilterName: string = 'custom-test-filter';
    const defaultCircleRadius: number = 16;
    const expectedLineBuffer: number = 4;

    beforeAll(() => {
        const div = document.createElement('div');

        drawerUtilsMock.setup(du => du.getDocumentElement()).returns(() => div.ownerDocument);
    });

    beforeEach(() => {
        testObject = new SVGShapeFactory(drawerUtilsMock.object);
    });

    test('create line, destination is on quadrant I', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: 100,
            y: 100,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const angle = Math.PI / 4;
        const expectedSource: IPoint = {
            x: (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        const expectedDestination: IPoint = {
            x: 100 - (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: 100 - (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, destination on quadrant II', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: -100,
            y: 100,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const angle = (3 * Math.PI) / 4;
        const expectedSource: IPoint = {
            x: (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        const expectedDestination: IPoint = {
            x: -100 - (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: 100 - (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, destination on quadrant III', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: -100,
            y: -100,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const angle = (5 * Math.PI) / 4;
        const expectedSource: IPoint = {
            x: (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        const expectedDestination: IPoint = {
            x: -100 - (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: -100 - (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, destination on quadrant IV', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: 100,
            y: -100,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const angle = (7 * Math.PI) / 4;
        const expectedSource: IPoint = {
            x: (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        const expectedDestination: IPoint = {
            x: 100 - (defaultCircleRadius + expectedLineBuffer) * Math.cos(angle),
            y: -100 - (defaultCircleRadius + expectedLineBuffer) * Math.sin(angle),
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, horizontal, left to right', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: 100,
            y: 0,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const expectedSource: IPoint = {
            x: defaultCircleRadius + expectedLineBuffer,
            y: 0,
        };

        const expectedDestination: IPoint = {
            x: 100 - (defaultCircleRadius + expectedLineBuffer),
            y: 0,
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, horizontal, right to left', () => {
        const source: IPoint = {
            x: 100,
            y: 0,
        };

        const destination: IPoint = {
            x: 0,
            y: 0,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const expectedSource: IPoint = {
            x: 100 - (defaultCircleRadius + expectedLineBuffer),
            y: 0,
        };

        const expectedDestination: IPoint = {
            x: defaultCircleRadius + expectedLineBuffer,
            y: 0,
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, vertical, top to bottom', () => {
        const source: IPoint = {
            x: 0,
            y: 100,
        };

        const destination: IPoint = {
            x: 0,
            y: 0,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const expectedSource: IPoint = {
            x: 0,
            y: 100 - (defaultCircleRadius + expectedLineBuffer),
        };

        const expectedDestination: IPoint = {
            x: 0,
            y: defaultCircleRadius + expectedLineBuffer,
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line, vertical, bottom to top', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: 0,
            y: 100,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        const expectedSource: IPoint = {
            x: 0,
            y: defaultCircleRadius + expectedLineBuffer,
        };

        const expectedDestination: IPoint = {
            x: 0,
            y: 100 - (defaultCircleRadius + expectedLineBuffer),
        };

        verifyLinePoints(line, expectedSource, expectedDestination);
    });

    test('create line (full params)', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: 100,
            y: 100,
        };

        const line = testObject.createLine(
            source,
            destination,
            defaultTestLineConfiguration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        verifyLineParams(line, defaultTestLineConfiguration, defaultTestFilterName);
    });

    test('create line (no stroke dash array)', () => {
        const source: IPoint = {
            x: 0,
            y: 0,
        };

        const destination: IPoint = {
            x: 100,
            y: 100,
        };

        const configuration: LineConfiguration = {
            stroke: '#fafafa',
            strokeWidth: '1',
        };

        const line = testObject.createLine(
            source,
            destination,
            configuration,
            defaultTestFilterName,
            defaultCircleRadius,
        );

        verifyLineParams(line, configuration, defaultTestFilterName);
    });

    test('create circle', () => {
        const center: IPoint = {
            x: 100,
            y: 100,
        };

        const configuration: CircleConfiguration = {
            stroke: '#fafafa',
            strokeWidth: '1',
            ellipseRx: '10',
            ellipseRy: '10',
            fill: '#FFFFFF',
        };

        const circle = testObject.createCircle(center, configuration);
        verifyCircleParams(circle, configuration, center);
    });

    test('create label', () => {
        const center: IPoint = {
            x: 100,
            y: 100,
        };

        const textConfig: TextConfiguration = {
            textAnchor: 'textAnchor',
            fontColor: 'fontColor',
        };

        const label = testObject.createTabIndexLabel(center, textConfig, 10);
        verifyTabIndexLabelParams(label, textConfig, center, 10);
    });

    function verifyTabIndexLabelParams(
        label: Element,
        configuration: TextConfiguration,
        center: IPoint,
        tabOrder: number,
    ): void {
        expect(label.tagName).toEqual('text');
        expect(label.getAttributeNS(null, 'class')).toEqual('insights-svg-focus-indicator-text');
        expect(label.getAttributeNS(null, 'x')).toEqual(center.x.toString());
        expect(label.getAttributeNS(null, 'y')).toEqual((center.y + 5).toString());
        expect(label.getAttributeNS(null, 'fill')).toEqual(configuration.fontColor);
        expect(label.getAttributeNS(null, 'text-anchor')).toEqual(configuration.textAnchor);
        expect(label.innerHTML).toEqual(tabOrder.toString());
    }

    function verifyCircleParams(
        circle: Element,
        configuration: CircleConfiguration,
        center: IPoint,
    ): void {
        expect(circle.tagName).toEqual('ellipse');
        expect(circle.getAttributeNS(null, 'fill')).toEqual(configuration.fill);
        expect(circle.getAttributeNS(null, 'stroke')).toEqual(configuration.stroke);
        expect(circle.getAttributeNS(null, 'stroke-width')).toEqual(configuration.strokeWidth);
        expect(circle.getAttributeNS(null, 'rx')).toEqual(configuration.ellipseRx);
        expect(circle.getAttributeNS(null, 'ry')).toEqual(configuration.ellipseRy);
        expect(circle.getAttributeNS(null, 'class')).toEqual('insights-svg-focus-indicator');
        expect(circle.getAttributeNS(null, 'cx')).toEqual(center.x.toString());
        expect(circle.getAttributeNS(null, 'cy')).toEqual(center.y.toString());
    }

    function verifyLineParams(
        line: Element,
        configuration: LineConfiguration,
        filterName: string,
    ): void {
        expect(line.tagName).toEqual('line');
        expect(line.getAttributeNS(null, 'class')).toEqual('insights-svg-line');
        expect(line.getAttributeNS(null, 'stroke')).toEqual(configuration.stroke);

        expect(line.getAttributeNS(null, 'stroke-width')).toEqual(configuration.strokeWidth);

        const strokeDasharray = line.getAttributeNS(null, 'stroke-dasharray');

        if (configuration.strokeDasharray != null) {
            expect(strokeDasharray).toEqual(configuration.strokeDasharray);
        } else {
            expect(strokeDasharray == null || strokeDasharray === '').toBe(true);
        }

        const filter = line.getAttributeNS(null, 'filter');
        expect(filter).toEqual(`url(#${filterName})`);
    }

    function verifyLinePoints(
        line: Element,
        expectedSource: IPoint,
        expectedDestination: IPoint,
    ): void {
        const fractionDigits: number = 12;
        const x1 = parseFloat(line.getAttributeNS(null, 'x1'));
        expect(x1).toBeCloseTo(expectedSource.x, fractionDigits);

        const y1 = parseFloat(line.getAttributeNS(null, 'y1'));
        expect(y1).toBeCloseTo(expectedSource.y, fractionDigits);

        const x2 = parseFloat(line.getAttributeNS(null, 'x2'));
        expect(x2).toBeCloseTo(expectedDestination.x, fractionDigits);

        const y2 = parseFloat(line.getAttributeNS(null, 'y2'));
        expect(y2).toBeCloseTo(expectedDestination.y, fractionDigits);
    }
});
