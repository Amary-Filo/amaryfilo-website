import { BaseDemoConfig, Manifest } from '@sandbox/shared/utils/tokens';
import { AccordionComponent } from './component/accordion.component';
import { AccordionControlsComponent } from './controls/controls.component';

export interface AccordionConfig extends BaseDemoConfig {
  isOpen: boolean;
  skeleton: boolean;
  headerTitle: string;
  headerText: string;
  bodyText: string;
  bottomText: string;
  skeletHeaderText: string;
  bottomShowButtons: boolean;
}

export const UI_ACCORDION_MANIFEST: Manifest<AccordionConfig> = {
  id: 'ui-accordion',
  slug: 'accordion',
  kind: 'ui',
  title: 'Accordion Component',
  description: 'Simple demo of accordion with controls.',
  tags: ['ui', 'accordion'],
  component: AccordionComponent,
  controls: AccordionControlsComponent,
  defaultConfig: {
    isOpen: true,
    skeleton: true,
    headerTitle: 'Accordion title',
    headerText: 'This is example accordion',
    bodyText: 'This is example text in body',
    bottomText: 'Bottom additional text',
    skeletHeaderText: 'Skeleton text',
    bottomShowButtons: false,
  },
};
