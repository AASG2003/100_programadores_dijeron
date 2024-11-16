import { NextResponse } from 'next/server';
import {getAnswersByQuestionId} from '@/services/answerService';

export async function GET(
    request: Request,
    { params }: { params: { questionId: string } }
) {
    try {
        const idPregunta = parseInt(params.questionId, 10);
        if (isNaN(idPregunta)) {
            return NextResponse.json({ message: 'Invalid idPregunta' }, { status: 400 });
        }

        const answers = await getAnswersByQuestionId(idPregunta);
        return NextResponse.json(answers, { status: 200 });
    } catch (error) {
        console.error('Error fetching answers:', error);
        return NextResponse.json({ message: 'Failed to fetch answers' }, { status: 500 });
    }
}
