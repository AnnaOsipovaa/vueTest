import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'

import Error from '../../components/Error.vue';

describe('Error.vue', () => {
    it('Отображает заголовок, описание ошибки и src картинки', () => {
        const title = 'Тест заголовок ошибки';
        const text = 'Тест описание ошибки';
        const src = 'photo.jpg';

        const { getByText, getByRole } = render(Error, {
            props: {
                title: title,
                text: text,
                image: src
            }
        })

        getByText(title);
        getByText(text);

        const img = getByRole('img');
        expect(img.getAttribute('src')).toBe('/img/' + src)
    })
});